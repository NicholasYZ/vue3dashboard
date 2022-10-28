import { ExportToCsv } from "export-to-csv";
import dayjs from "dayjs";

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: false,
  title: "",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: "",
};

export function useExport() {
  return (dataSource: any, title: string) => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    options.title = title;
    options.filename = `${title}-${now}`;
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(dataSource);
  };
}
