import AdmZip from "adm-zip";
import { Response } from "express";
import { existsSync, readdirSync, unlinkSync } from "fs";

export default function sendZipFile(res: Response) {
  const directory = "./files";

  try {
    const files = readdirSync(directory);

    if (files.length > 0) {
      if (files.length === 1) {
        handleSingleFile(`${directory}/${files[0]}`, res);
      } else {
        handleMultipleFiles(directory, files, res);
      }
    } else {
      res.status(500).json("No files!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function handleSingleFile(fileName: string, res: Response) {
  res.download(fileName, (error) => {
    if (error !== undefined) {
      console.error(error);
    }
  });
}

function handleMultipleFiles(
  directory: string,
  files: ReadonlyArray<string>,
  res: Response
) {
  const zip = new AdmZip();

  files.forEach((file) => {
    zip.addLocalFile(`${directory}/${file}`);
  });

  const zipFileName = `${Intl.DateTimeFormat("en-GB")
    .format()
    .replaceAll("/", "-")}.zip`;

  zip.writeZip(zipFileName);
  res.download(zipFileName, (error) => {
    if (error !== undefined) {
      console.error(error);
    }

    deleteFile(zipFileName);
  });
}

function deleteFile(fileName: string) {
  if (existsSync(fileName)) {
    try {
      unlinkSync(fileName);
    } catch {
      console.error(`Unable to delete ${fileName}`);
    }
  }
}
