import { ManageParamsProps } from "./ManageParams.types";
import { TableListParams } from "./TableListParams";

export function ManageParams({ strategy, params, onBack }: ManageParamsProps) {

  const filteredParams = params.filter(param => param.strategyId === strategy.id);
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">{strategy.name}</h1>
        <p className="text-sm text-gray-600">{strategy.description}</p>
      </div>

      <TableListParams params={filteredParams} onBack={onBack} />
    </div>
  );
}