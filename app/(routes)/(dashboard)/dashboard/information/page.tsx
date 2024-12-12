export default function page() {
  return (
    <div className="px-8 py-6">
      <h1 className="mb-6 text-4xl font-bold">Explicación de los Datos</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Explicación de los Términos</h2>
        <ul className="pl-5 space-y-2 text-lg list-disc">
          <li>
            <strong>Calidad del historial:</strong> Indica la precisión y completitud de los datos históricos utilizados para análisis. Si es menos del 100% no quiere decir que los datos historicos esten mal, sino que falta una pequeña información en tiempo real. Segun la estrategia esta información puede ser importante.
          </li>
          <li>
            <strong>Barras:</strong> Representan períodos de tiempo en los datos históricos, como velas en un gráfico financiero.
          </li>
          <li>
            <strong>Ticks:</strong> Cada cambio en el precio del mercado. Un tick es el nivel más bajo de detalle en el movimiento de un precio.
          </li>
          <li>
            <strong>Símbolos:</strong> Los activos financieros utilizados en el análisis, como pares de divisas (ej., EUR/USD).
          </li>
          <li>
            <strong>Beneficio Neto:</strong> La ganancia o pérdida final después de restar todas las pérdidas del beneficio bruto.
          </li>
          <li>
            <strong>Reducción absoluta del balance:</strong> La mayor caída en el saldo desde el punto más alto alcanzado.
          </li>
          <li>
            <strong>Reducción absoluta de la equidad:</strong> La mayor caída en el valor de la cuenta (incluyendo posiciones abiertas) desde su punto más alto.
          </li>
          <li>
            <strong>Beneficio Bruto:</strong> La suma total de todas las ganancias sin considerar las pérdidas.
          </li>
          <li>
            <strong>Reducción máxima del balance:</strong> La mayor pérdida observada en el balance durante el análisis.
          </li>
          <li>
            <strong>Reducción máxima de la equidad:</strong> La mayor caída observada en la equidad durante el análisis.
          </li>
          <li>
            <strong>Pérdidas Brutas:</strong> La suma total de todas las pérdidas sin considerar las ganancias.
          </li>
          <li>
            <strong>Reducción relativa del balance:</strong> La reducción máxima del balance expresada como un porcentaje del balance inicial.
          </li>
          <li>
            <strong>Reducción relativa de la equidad:</strong> La reducción máxima de la equidad expresada como un porcentaje del balance inicial.
          </li>
          <li>
            <strong>Factor de Beneficio:</strong> La relación entre el beneficio bruto y las pérdidas brutas. Un valor mayor a 1 indica rentabilidad.
          </li>
          <li>
            <strong>Beneficio Esperado:</strong> La ganancia o pérdida promedio esperada por operación.
          </li>
          <li>
            <strong>Nivel de margen:</strong> Muestra la proporción entre la equidad de la cuenta y el margen requerido para abrir posiciones.
          </li>
          <li>
            <strong>Factor de Recuperación:</strong> Mide la relación entre el beneficio neto y la reducción máxima. Un valor positivo indica que las pérdidas han sido recuperadas.
          </li>
          <li>
            <strong>Ratio de Sharpe:</strong> Indica la rentabilidad ajustada por el riesgo. Un valor mayor a 1 es considerado bueno.
          </li>
          <li>
            <strong>Z-Score:</strong> Mide la aleatoriedad de las operaciones. Un valor bajo puede indicar que el resultado de las operaciones es predecible.
          </li>
          <li>
            <strong>AHPR:</strong> Indica el rendimiento promedio de las operaciones en términos porcentuales.
          </li>
          <li>
            <strong>GHPR:</strong> Muestra el rendimiento compuesto promedio de las operaciones.
          </li>
          <li>
            <strong>LR Correlation:</strong> Indica qué tan bien se relacionan los datos de las operaciones.
          </li>
          <li>
            <strong>LR Standard Error:</strong> Mide la precisión de la correlación lineal.
          </li>
          <li>
            <strong>Total de operaciones ejecutadas:</strong> Número total de operaciones realizadas durante el análisis.
          </li>
          <li>
            <strong>Posiciones cortas:</strong> Transacciones realizadas esperando que el precio baje.
          </li>
          <li>
            <strong>Posiciones largas:</strong> Transacciones realizadas esperando que el precio suba.
          </li>
          <li>
            <strong>Total de transacciones:</strong> La cantidad total de operaciones abiertas y cerradas.
          </li>
          <li>
            <strong>Posiciones rentables:</strong> Operaciones que resultaron en ganancias.
          </li>
          <li>
            <strong>Posiciones no rentables:</strong> Operaciones que resultaron en pérdidas.
          </li>
          <li>
            <strong>Número máximo de pérdidas consecutivas:</strong> La mayor cantidad de operaciones consecutivas con pérdidas.
          </li>
          <li>
            <strong>Máximo de pérdidas consecutivas:</strong> La suma total de las pérdidas de las operaciones consecutivas con pérdida más alta.
          </li>
          <li>
            <strong>Correlación (Beneficios y MFE):</strong> Relación entre los beneficios y la máxima excursión favorable (MFE).
          </li>
          <li>
            <strong>Correlación (Beneficios y MAE):</strong> Relación entre los beneficios y la máxima excursión adversa (MAE).
          </li>
          <li>
            <strong>Correlación (MFE y MAE):</strong> Relación entre la máxima excursión favorable y la adversa.
          </li>
          <li>
            <strong>Tiempo mínimo para retener la posición:</strong> El tiempo más corto que una posición se mantuvo abierta.
          </li>
          <li>
            <strong>Tiempo máximo para retener la posición:</strong> El tiempo más largo que una posición se mantuvo abierta.
          </li>
          <li>
            <strong>Tiempo medio para retener la posición:</strong> El promedio de tiempo que las posiciones permanecen abiertas.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Explicación de las Tablas</h2>

        <h3 className="mt-4 mb-4 text-xl font-semibold">Tabla 1: Órdenes</h3>
        <ul className="pl-5 space-y-2 text-lg list-disc">
          <li><strong>Hora Apertura:</strong> Fecha y hora en que se realizó la orden.</li>
          <li><strong>Orden:</strong> Número único que identifica cada orden.</li>
          <li><strong>Símbolo:</strong> Activo financiero asociado a la orden.</li>
          <li><strong>Tipo:</strong> Compra buy o venta sell.</li>
          <li><strong>Volumen:</strong> Tamaño de la transacción.</li>
          <li><strong>Precio:</strong> Precio al que se ejecutó la operación.</li>
          <li><strong>S/L y T/P:</strong> Niveles de Stop Loss y Take Profit.</li>
          <li><strong>Estado:</strong> Estado de la orden (ej., ejecutada o pendiente).</li>
          <li><strong>Comentario:</strong> Información adicional sobre la orden.</li>
        </ul>

        <h3 className="mt-4 mb-4 text-xl font-semibold">Tabla 2: Transacciones</h3>
        <ul className="pl-5 space-y-2 text-lg list-disc">
          <li><strong>Transacción:</strong> Número único que identifica cada transacción.</li>
          <li><strong>Símbolo:</strong> Activo financiero involucrado.</li>
          <li><strong>Tipo:</strong> Tipo de operación (compra o venta).</li>
          <li><strong>Dirección:</strong> Entrada in o salida out.</li>
          <li><strong>Volumen:</strong> Tamaño de la operación.</li>
          <li><strong>Precio:</strong> Precio de ejecución de la operación.</li>
          <li><strong>Orden:</strong> Orden asociada a la transacción.</li>
          <li><strong>Comisión:</strong> Costo de la operación.</li>
          <li><strong>Beneficio:</strong> Ganancia o pérdida generada.</li>
          <li><strong>Balance:</strong> Balance actualizado después de la operación.</li>
        </ul>
      </section>
    </div>
  );
}
