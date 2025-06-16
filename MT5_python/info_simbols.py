# cd C:\Users\juanjose\Desktop\mt5_python\TFG
# conda activate mt5python
# python info_simbols.py
# ngrok config add-authtoken 2s4VzzdK1K2rRMGN6LJcHxYauTC_4xi1CS6KKq8d1CbuAERy
# ngrok http 5000

# taskkill /F /IM terminal64.exe
# timeout /t 2
# "C:\Program Files\MetaTrader 5\terminal64.exe" /config:C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\CONFIGURACIONES\PRUEBA.ini
# "C:\Program Files\MetaTrader 5\terminal64.exe" /config:C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\CONFIGURACIONES\python\prueba.ini
# Documentacion .ini https://www.metatrader5.com/en/terminal/help/start_advanced/start

from flask import Flask, jsonify, request, send_file
from flask_cors import CORS 
import MetaTrader5 as mt5
import os
import subprocess
import time
import psutil

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "https://79b9-87-221-41-230.ngrok-free.app"}})
CORS(app)

creds = {
    "path": "C:\\Program Files\\MetaTrader 5\\terminal64.exe",
    "login": 1510696228,
    "pass": "F2LyA6$L35Z9*v",
    "server": "FTMO-Demo",
    "timeout": 60000,
    "portable": False
}

def abrir_mt5():
    if mt5.initialize(path=creds['path'],
                      login=creds['login'],
                      password=creds['pass'],
                      server=creds['server'],
                      timeout=creds['timeout'],
                      portable=creds['portable']):
        print("Plataforma MT5 lanzada correctamente")
    else:
        print(f"Ha habido un problema en la inicialización: {mt5.last_error()}")

@app.route('/api/symbols', methods=['GET'])
def obtener_simbolos():
    print("Solicitud recibida desde:", request.remote_addr)
    abrir_mt5()
    symbols = mt5.symbols_get()
    mt5.shutdown()
    
    if not symbols:
        return jsonify({"error": "No se encontraron símbolos disponibles."}), 404
    
    symbol_list = [{"name": symbol.name, "bid": symbol.bid, "ask": symbol.ask, "spread": symbol.spread} for symbol in symbols]
    return jsonify(symbol_list)

@app.route('/api/report', methods=['GET'])
def enviar_reporte_json():
    try:
        path_to_json = os.path.join(os.getcwd(), "reporte_convertido.json")
        
        if not os.path.exists(path_to_json):
            return jsonify({"error": "El archivo reporte_convertido.json no existe."}), 404

        return send_file(path_to_json, mimetype='application/json')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/report_image', methods=['GET'])
def enviar_report_backtest():
    #path_to_image = os.path.join(os.getcwd(), r'C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest.png')
    path_to_image = os.path.join(os.getcwd(), r'C:\Users\cacha\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest.png')
    if not os.path.exists(path_to_image):
        return jsonify({"error": "El archivo report_backtest.png no existe."}), 404
    return send_file(path_to_image, mimetype='image/png')

@app.route('/api/report_image2', methods=['GET'])
def enviar_report_backtest_2():
    #path_to_image = os.path.join(os.getcwd(), r'C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest-hst.png')
    path_to_image = os.path.join(os.getcwd(), r'C:\Users\cacha\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest-hst.png')
    if not os.path.exists(path_to_image):
        return jsonify({"error": "El archivo report_backtest.png no existe."}), 404
    return send_file(path_to_image, mimetype='image/png')

def procesar_estrategia(formatted_values):

    name_strategy = formatted_values.get("nameStrategy", "")

    if name_strategy == "RSI":
        params = {
            "simbolo": formatted_values.get("symbol", "EURUSD"),
            "periodo": formatted_values.get("period", "M15"),
            "deposito": formatted_values.get("deposit", "10000"),
            "divisa": formatted_values.get("currency", "USD"),
            "apalancamiento": formatted_values.get("leverage", "33"),
            "fecha_inicio": formatted_values.get("fromDate", "2024.02.01"),
            "fecha_fin": formatted_values.get("toDate", "2024.07.01"),
            "rsi_sobrecompra": formatted_values.get("RSI_SOBRECOMPRA", "70"),
            "rsi_sobreventa": formatted_values.get("RSI_SOBREVENDIDO", "30"),
            "RsiPeriod": formatted_values.get("RSI_PERIODO", "14"),
            "RATIO": formatted_values.get("RATIO", "1.0"),
            "LOTAJE_STATIC": formatted_values.get("LOTAJE_STATIC", "0.1"),
            "sl": formatted_values.get("SL_POINTS", "2000"),
        }

        config_all = """[Tester]
Expert=TFG\RSI-v2.ex5
Symbol={simbolo}
Period={periodo}
Optimization=0
Model=0
FromDate={fecha_inicio}
ToDate={fecha_fin}
ForwardMode=0
Deposit={deposito}
Currency={divisa}
ProfitInPips=0
Leverage={apalancamiento}
ExecutionMode=38
OptimizationCriterion=1
Report=report_backtest
ReplaceReport=1
ShutdownTerminal=1
Visual=0
[TesterInputs]
; Indicador RSI
RsiPeriod={RsiPeriod}||7||7||21||Y
RSI_SOBRECOMPRA={rsi_sobrecompra}||50.0||5.0||80.0||Y
RSI_SOBREVENDIDO={rsi_sobreventa}||20.0||5.0||50.0||Y
; SL/TP
SL_POINTS={sl}||200||200||2000||Y
RATIO_TP={RATIO}||0.5||0.5||3.0||Y
LOTAJE_STATIC={LOTAJE_STATIC}||0.1||0.010000||1.000000||N
""".format(**params)

    elif name_strategy == "Apertura Nueva York":
        params = {
            "simbolo": formatted_values.get("symbol", "EURUSD"),
            "periodo": formatted_values.get("period", "M15"),
            "deposito": formatted_values.get("deposit", "10000"),
            "divisa": formatted_values.get("currency", "USD"),
            "apalancamiento": formatted_values.get("leverage", "33"),
            "fecha_inicio": formatted_values.get("fromDate", "2024.02.01"),
            "fecha_fin": formatted_values.get("toDate", "2024.07.01"),
            "PUNTOS_PRECIO": formatted_values.get("PUNTOS_PRECIO", "2000"),
            "HORAS_EXPIRACION": formatted_values.get("HORAS_EXPIRACION", "2000"),
            "RATIO": formatted_values.get("RATIO", "1.0"),
            "LOTAJE_STATIC": formatted_values.get("LOTAJE_STATIC", "0.1"),
            "SL_POINTS": formatted_values.get("SL_POINTS", "2000"),
        }

        config_all = """[Tester]
Expert=TFG\AperturaNY.ex5
Symbol={simbolo}
Period={periodo}
Optimization=0
Model=0
FromDate={fecha_inicio}
ToDate={fecha_fin}
ForwardMode=0
Deposit={deposito}
Currency={divisa}
ProfitInPips=0
Leverage={apalancamiento}
ExecutionMode=38
OptimizationCriterion=1
Report=report_backtest
ReplaceReport=1
ShutdownTerminal=1
Visual=0
[TesterInputs]
SL_POINTS={SL_POINTS}||2000||1||20000||N
RATIO_TP={RATIO}||2.0||0.200000||20.000000||N
LOTAJE_STATIC={LOTAJE_STATIC}||0.1||0.010000||1.000000||N
PUNTOS_PRECIO={PUNTOS_PRECIO}||2000||1||20000||N
HORAS_EXPIRACION={HORAS_EXPIRACION}||2||1||20||N
""".format(**params)

    elif name_strategy == "Acumulacion Manipulacion Distribucion":
        params = {
            "simbolo": formatted_values.get("symbol", "EURUSD"),
            "periodo": formatted_values.get("period", "M15"),
            "deposito": formatted_values.get("deposit", "10000"),
            "divisa": formatted_values.get("currency", "USD"),
            "apalancamiento": formatted_values.get("leverage", "33"),
            "fecha_inicio": formatted_values.get("fromDate", "2024.02.01"),
            "fecha_fin": formatted_values.get("toDate", "2024.07.01"),
            "HORA_INICIO_RECOGIDA": formatted_values.get("HORA_INICIO_RECOGIDA", "8"),
            "MINUTO_INICIO_RECOGIDA": formatted_values.get("MINUTO_INICIO_RECOGIDA", "30"),
            "HORA_FINAL_RECOGIDA": formatted_values.get("HORA_FINAL_RECOGIDA", "14"),
            "MINUTO_FINAL_RECOGIDA": formatted_values.get("MINUTO_FINAL_RECOGIDA", "0"),
            "HORA_FINAL_OPERACIONES": formatted_values.get("HORA_FINAL_OPERACIONES", "22"),
            "MINUTO_FINAL_OPERACIONES": formatted_values.get("MINUTO_FINAL_OPERACIONES", "0"),
            "RATIO": formatted_values.get("RATIO", "1.0"),
            "LOTAJE_STATIC": formatted_values.get("LOTAJE_STATIC", "0.1"),
            "SL_POINTS": formatted_values.get("SL_POINTS", "2000"),
        }

        config_all = """[Tester]
Expert=TFG\AcumulacionManipulacionDistribucion.ex5
Symbol={simbolo}
Period={periodo}
Optimization=0
Model=0
FromDate={fecha_inicio}
ToDate={fecha_fin}
ForwardMode=0
Deposit={deposito}
Currency={divisa}
ProfitInPips=0
Leverage={apalancamiento}
ExecutionMode=38
OptimizationCriterion=1
Report=report_backtest
ReplaceReport=1
ShutdownTerminal=1
Visual=0
[TesterInputs]
; Recogida de datos
HORA_INICIO_RECOGIDA={HORA_INICIO_RECOGIDA}||8||1||80||N
MINUTO_INICIO_RECOGIDA={MINUTO_INICIO_RECOGIDA}||30||1||300||N
HORA_FINAL_RECOGIDA={HORA_FINAL_RECOGIDA}||14||1||140||N
MINUTO_FINAL_RECOGIDA={MINUTO_FINAL_RECOGIDA}||0||1||10||N
; Horario operaciones de datos
USAR_HORA_CIERRE=true||false||0||true||N
HORA_FINAL_OPERACIONES={HORA_FINAL_OPERACIONES}||22||1||220||N
MINUTO_FINAL_OPERACIONES={MINUTO_FINAL_OPERACIONES}||0||1||10||N
; SL/TP
SL_POINTS={SL_POINTS}||200||1||2000||N
RATIO_TP={RATIO}||1.0||0.100000||10.000000||N
LOTAJE_STATIC={LOTAJE_STATIC}||0.1||0.010000||1.000000||N
""".format(**params)
        
    else:
        config_all = f"Estrategia '{name_strategy}' no reconocida o no implementada."

    #ini_path = fr'C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\CONFIGURACIONES\python\{name_strategy}.ini'
    ini_path = fr'C:\Users\cacha\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\CONFIGURACIONES\python\{name_strategy}.ini'
    os.makedirs(os.path.dirname(ini_path), exist_ok=True)

    with open(ini_path, 'w') as config_file:
        config_file.write(config_all)

    print(f"Archivo {ini_path} creado exitosamente.")
    return ini_path

@app.route('/api/submit_strategy', methods=['POST'])
def recibir_estrategia():
    try:
        data = request.json
        formatted_values = data.get("formattedValues", {})
        name_strategy = formatted_values.get("nameStrategy", "")

        print(f"Nombre de la estrategia: {name_strategy}")

        ini_path = procesar_estrategia(formatted_values)
        print(f"Ini path: {ini_path}")

        os.chmod(ini_path, 0o777)
        time.sleep(2)

        #xm_terminal_path = "C:\\Program Files\\XM MT5\\terminal64.exe"
        xm_terminal_path = "C:\\Program Files\\MetaTrader 5 copia\\terminal64.exe"
        #mt5_terminal_path = creds['path']
        mt5_terminal_path = "C:\\Program Files\\MetaTrader 5\\terminal64.exe"

        ini_path_xm = fr'C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\CONFIGURACIONES\python\RSI-XM.ini'
        command_xm = f'"{xm_terminal_path}" /auto /config:{ini_path_xm}'
        command_mt5 = f'"{mt5_terminal_path}" /auto /config:{ini_path}'

        xm_process = subprocess.Popen(command_xm, shell=True)
        print("XM 5 iniciado con el archivo de configuración.")

        time.sleep(2)

        mt5_process = subprocess.Popen(command_mt5, shell=True)
        print("MetaTrader 5 iniciado con el archivo de configuración.")

        mt5_process.wait()
        print("MetaTrader 5 se ha cerrado.")

        for proc in psutil.process_iter(attrs=["pid", "name", "exe"]):
            try:
                if proc.info["name"] == "terminal64.exe" and proc.info["exe"] == xm_terminal_path:
                    print(f"Cerrando proceso XM Terminal con PID {proc.info['pid']}")
                    proc.terminate()
                    proc.wait(timeout=5)
                    print("Proceso XM Terminal cerrado.")
                    break
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
        else:
            print("No se encontró el proceso XM Terminal para cerrar.")

        subprocess.run(["python", "leer_report_mt5.py"])
        print("Script leer_report_mt5.py ejecutado.")

        subprocess.run(["python", "convertir_resultado_json_mt5.py"])
        print("Script convertir_resultado_json_mt5.py ejecutado.")

        return jsonify({"message": "Estrategia procesada y lista"}), 200

    except Exception as e:
        print(f"Error al procesar la estrategia: {e}")
        return jsonify({"message": "Error al procesar la estrategia"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
