import os
import html2text

# Ruta al archivo HTML
#file_path = r"C:\Users\juanjose\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest.htm"
file_path = r"C:\Users\cacha\AppData\Roaming\MetaQuotes\Terminal\D0E8209F77C8CF37AD8BF550E51FF075\report_backtest.htm"

# Ruta al nuevo archivo de texto donde se guardará el contenido
#output_file_path = r"C:\Users\juanjose\Desktop\mt5_python\TFG\reporte_convertido.txt"
output_file_path = r"C:\Users\cacha\Desktop\mt5\final\reporte_convertido.txt"

def ajustar_transacciones(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # Variables para procesar el contenido
    output_lines = []
    in_transacciones = False  # Para identificar si estamos dentro de la sección Transacciones
    start_parsing = False  # Para saber cuándo procesar transacciones después del encabezado
    buffer_line = ""  # Para combinar líneas en Transacciones ajustadas

    for idx, line in enumerate(lines):
        line = line.strip()  # Limpiar espacios al inicio y al final de cada línea

        # Detectar la sección "Transacciones"
        if "Transacciones" in line:
            in_transacciones = True
            output_lines.append(line)  # Mantener la línea de título
            continue

        # Detectar el encabezado de Transacciones
        if in_transacciones and "Fecha/Hora | Transacción | Símbolo" in line:
            output_lines.append(line)  # Mantener el encabezado
            start_parsing = True  # Activar el procesamiento de transacciones
            continue

        # Procesar líneas de Transacciones
        if start_parsing:
            # Si encontramos una línea vacía o un separador, terminamos la sección
            if line == "" or "---" in line:
                if buffer_line:
                    output_lines.append(buffer_line)  # Añadir la última línea combinada
                    buffer_line = ""
                in_transacciones = False
                start_parsing = False
                output_lines.append(line)  # Mantener el separador o línea vacía
                continue

            # Detectar si la línea actual comienza con una fecha (por el formato general de transacciones)
            # Ejemplo: líneas que empiezan con 'YYYY.MM.DD' usando un patrón genérico
            if len(line) > 10 and line[4] == '.' and line[7] == '.':
                if buffer_line:
                    output_lines.append(buffer_line)  # Añadir la línea combinada anterior
                buffer_line = line  # Iniciar una nueva línea combinada
            else:
                # Si no es una nueva transacción, es una continuación de la anterior
                buffer_line += " " + line.strip()  # Combinar la línea con la anterior

        else:
            # Fuera de la sección "Transacciones", mantener el resto del contenido igual
            output_lines.append(line)

    # Asegurarse de agregar la última línea combinada de Transacciones
    if buffer_line:
        output_lines.append(buffer_line)

    # Sobrescribir el archivo original con el contenido ajustado
    with open(file_path, 'w', encoding='utf-8') as output_file:
        output_file.write("\n".join(output_lines))

    print(f"Archivo ajustado correctamente: {file_path}")

# Verificar si el archivo existe
if os.path.exists(file_path):
    try:
        # Intentar abrir el archivo con la codificación UTF-16
        with open(file_path, 'r', encoding='utf-16') as file:
            content = file.read()
        print("Contenido leído con codificación UTF-16:")
    except UnicodeDecodeError:
        print("Error de codificación al intentar leer el archivo.")

    # Si se leyó correctamente el archivo, usamos html2text para convertirlo en texto
    if content:
        try:
            # Crear un conversor html2text
            converter = html2text.HTML2Text()
            converter.ignore_links = True  # Ignorar los enlaces
            converter.ignore_images = True  # Ignorar imágenes
            converter.ignore_emphasis = True  # Ignorar formato de énfasis (negritas, itálicas, etc.)

            # Convertir el contenido HTML a texto plano
            text = converter.handle(content)

            # Guardar el texto limpio en un archivo de salida
            with open(output_file_path, 'w', encoding='utf-8') as output_file:
                output_file.write(text)

            print(f"Contenido importante guardado correctamente en {output_file_path}")
            # Ejecutar la función
            ajustar_transacciones(output_file_path)

        except Exception as e:
            print(f"Error procesando el archivo: {e}")
else:
    print("El archivo no existe en la ruta especificada.")





