import os
import json

#file_path = r"C:\Users\juanjose\Desktop\mt5_python\TFG\reporte_convertido.txt"
file_path = r"C:\Users\cacha\Desktop\mt5\final\reporte_convertido.txt"
#json_output_path = r"C:\Users\juanjose\Desktop\mt5_python\TFG\reporte_convertido.json"
json_output_path = r"C:\Users\cacha\Desktop\mt5\final\reporte_convertido.json"

def parse_mt5_report(file_path):
    data = {
        "configuracion": {
            "parametros_entrada": {}
        },
        "resultados": {},
        "ordenes": [],
        "transacciones": []
    }

    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    current_section = None
    is_parametros_entrada = False

    for idx, line in enumerate(lines):
        line = line.strip()

        if "Configuración" in line:
            current_section = "configuracion"
        elif "Resultados" in line:
            current_section = "resultados"
            is_parametros_entrada = False
        elif "Órdenes" in line:
            current_section = "ordenes"
            continue  # Stop processing further results as we reached a new section
        elif "Transacciones" in line:
            current_section = "transacciones"
            continue

        if line.startswith("|"):
            line = line.lstrip("| ").strip()

        if current_section == "configuracion" and ":" in line:
            key, value = map(str.strip, line.split(":", 1))
            if key == "Parámetros de entrada":
                is_parametros_entrada = True
            elif not is_parametros_entrada:
                data["configuracion"][key] = value.lstrip("| ").strip()
        elif is_parametros_entrada and "=" in line:
            param_key, param_value = map(str.strip, line.split("=", 1))
            data["configuracion"]["parametros_entrada"][param_key] = param_value

        elif current_section == "resultados" and ":" in line:
            parts = list(map(str.strip, line.split("|")))
            for i in range(0, len(parts) - 1, 2):
                key = parts[i]
                value = parts[i + 1]
                if key and value:
                    data["resultados"][key] = value

            if "Total de transacciones" in line:
                additional_lines = lines[idx + 1:]
                for additional_line in additional_lines:
                    additional_line = additional_line.strip()
                    if additional_line.startswith("|"):
                        additional_line = additional_line.lstrip("| ").strip()
                    elif "Órdenes" in additional_line:
                        break  # Stop processing as we reached the Órdenes section
                    sub_parts = list(map(str.strip, additional_line.split("|")))
                    for j in range(0, len(sub_parts) - 1, 2):
                        key = sub_parts[j]
                        value = sub_parts[j + 1]
                        if key and value:
                            data["resultados"][key] = value

        elif current_section == "ordenes" and "|" in line:
            columns = list(map(str.strip, line.split("|")))
            if len(columns) >= 10:
                data["ordenes"].append({
                    "hora_apertura": columns[0],
                    "orden": columns[1],
                    "simbolo": columns[2],
                    "tipo": columns[3],
                    "volumen": columns[4],
                    "precio": columns[5],
                    "sl": columns[6],
                    "tp": columns[7],
                    "fecha_hora": columns[8],
                    "estado": columns[9],
                    "comentario": columns[10] if len(columns) > 10 else ""
                })

        elif current_section == "transacciones" and "|" in line:
            columns = list(map(str.strip, line.split("|")))
            if len(columns) >= 12:
                data["transacciones"].append({
                    "Fecha/Hora": columns[0],
                    "Transacción": columns[1],
                    "Símbolo": columns[2],
                    "Tipo": columns[3],
                    "Dirección": columns[4],
                    "Volumen": columns[5],
                    "Precio": columns[6],
                    "Orden": columns[7],
                    "Comisión": columns[8],
                    "Swap": columns[9],
                    "Beneficio": columns[10],
                    "Balance": columns[11],
                    "Comentario": columns[12] if len(columns) > 12 else ""
                })

    if "Empresa" not in data["configuracion"]:
        for line in lines:
            if ":" in line:
                key, value = map(str.strip, line.split(":", 1))
                if key in ["Empresa", "Divisa", "Depósito inicial", "Apalancamiento"]:
                    data["configuracion"][key] = value.lstrip("| ").strip()

    return data

data = parse_mt5_report(file_path)

with open(json_output_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f"Archivo JSON generado correctamente en {json_output_path}")
