import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { readdirSync, existsSync, unlinkSync } from 'fs';
const AdmZip = require('adm-zip');

@Controller('file-sharing')
export class FileSharingController {
  private readonly zipName = 'files.zip';

  constructor() {
    if (existsSync(this.zipName)) {
      try {
        unlinkSync(this.zipName);
      } catch {
        console.error('Unable to delete previous zip file');
      }
    }
  }

  private handleError(error?: Error) {
    if (error) {
      console.error(error);
    }
  }

  @Get()
  async getFiles(@Res() res: Response) {
    try {
      const zip = new AdmZip();

      const directory = './files';
      readdirSync(directory).forEach((file) => {
        zip.addLocalFile(`${directory}/${file}`);
      });

      zip.writeZip(this.zipName);
      res.download(this.zipName, this.handleError);
    } catch (e) {
      const error: Error = e;
      res.status(400).json(error.message);
    }
  }

  @Post()
  async getSpecificFiles(
    @Body('filePaths') filePaths: ReadonlyArray<string>,
    @Res() res: Response,
  ) {
    try {
      if (filePaths && filePaths.length > 0) {
        if (filePaths.length === 1) {
          res.download(filePaths[0], this.handleError);
        } else {
          const zip = new AdmZip();

          filePaths.forEach((filePath) => {
            zip.addLocalFile(filePath);
          });

          zip.writeZip(this.zipName);
          res.download(this.zipName, this.handleError);
        }
      } else {
        throw new Error('No file passed!');
      }
    } catch (e) {
      const error: Error = e;
      res.status(400).json(error.message);
    }
  }
}
