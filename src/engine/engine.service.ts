
import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
//const sharp = require('sharp');
 const webp = require('webp-converter');
var path = require("path");
@Injectable()
export class EngineService {

    private readonly logger = new Logger(EngineService.name);
    constructor(
    
        private configService: ConfigService,
     
    
      ) { }
    async uploadFile(file: Express.Multer.File, format: string, path: string, filename: string) {
        //Get Image Information
        var image_information = await file.buffer;
   
   
    
        //Convert Image
        const buffers_file = await webp.buffer2webpbuffer(file.buffer, format, "-q 70", this.configService.get("PATH_UPLOAD"));
        var file_commpress = buffers_file;
    

        if (await this.createFolder('./temp/', path)) {
          fs.writeFile("./temp/" + path + "/" + filename + "." + format, file_commpress, function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The file was saved!");
          });
        }
        return file_commpress;
      }

      async getImageMode(width: number, height: number) {
        var mode = "LANDSCAPE";
        if (width > height) {
          mode = "LANDSCAPE";
        } else if (height > width) {
          mode = "POTRET";
        } else {
          mode = "LANDSCAPE";
        }
        return mode;
      }
      async createFolder(current_path: string, new_folder: string): Promise<boolean> {
        var isTrue = false;
        if (await fs.existsSync(path.resolve(current_path + new_folder))) {
          isTrue = true;
        } else {
          try {
            await fs.mkdirSync(path.resolve(current_path + new_folder), { recursive: true });
            //await fs.mkdirSync(path.resolve(current_path + new_folder));
            isTrue = true;
          } catch (err) {
            //console.log(err);
            isTrue = false;
          }
        }
        //console.log(isTrue);
        return isTrue;
      }
}
