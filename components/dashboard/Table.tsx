const defaultColors = [
  "bg-[#e7f0fd]", // baby blue
  "bg-[#f1e8fb]", // lavender mist
  "bg-[#e7fbf1]", // mint cream
  "bg-[#fff4e8]", // peach cream
  "bg-[#fce7ee]", // soft rose
];

// const colors = [
//   "bg-[#f0f6ff]", // ice blue
//   "bg-[#e1edff]", // cloud blue
//   "bg-[#d2e5ff]", // soft azure
//   "bg-[#c4ddff]", // sky tint
//   "bg-[#b5d5ff]", // powder blue
// ];

// const colors = [
//   "bg-[#eaf8f8]", // ice mint
//   "bg-[#edf6ff]", // mist sky
//   "bg-[#f8f1ff]", // whisper lilac
//   "bg-[#fef6e4]", // soft peach
//   "bg-[#fdf1f5]", // blush white
// ];

function Table<T>({
  data,
  fields,
  colors = defaultColors,
}: {
  data: T[];
  fields: (keyof T)[];
  colors?: string[];
}) {
  return (
    <div className="table-div custom-scrollbar overflow-auto rounded-xl pb-3">
      <table className="min-w-full p-2 text-left">
        <thead className="bg-primary text-white font-semibold p-2">
          <tr>
            {fields.map((field: keyof T) => (
              <th className="capitalize p-2" key={"th-" + (field as string)}>
                {(field as string).replaceAll("_", " ").trim()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row: T, r: number) => (
            <tr key={"tr-" + r} className="max-h-[50px]">
              {fields.map((field: keyof T, c: number) => (
                <td
                  className={`overflow-x-scroll text-sm max-w-[250px] overflow-y-hidden whitespace-nowrap scrollbar-thin ${
                    colors[c % colors.length]
                  }`}
                  key={"td-" + r + "-" + c}
                >
                  <div
                    className={`w-full h-full p-2 inline-block text-gray-800`}
                  >
                    {String(row[field])}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
