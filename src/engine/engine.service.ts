
import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
//const sharp = require('sharp');
// const webp = require('webp-converter');
var path = require("path");
@Injectable()
export class EngineService {

    private readonly logger = new Logger(EngineService.name);
    constructor(
    
        private configService: ConfigService,
     
    
      ) { }
    // async uploadFile(file: Express.Multer.File, format: string, path: string, filename: string) {
    //     //Get Image Information
    //     var image_information = await sharp(file.buffer).metadata();
    //     console.log("IMAGE INFORMATION", image_information);
    
    //     var image_height = image_information.height;
    //     var image_width = image_information.width;
    //     var image_size = image_information.size;
    //     var image_format = image_information.format;
    //     var image_orientation = image_information.orientation;
    
    //     //Get Image Mode
    //     var image_mode = await this.getImageMode(image_width, image_height);
    //     console.log("IMAGE MODE", image_mode);
    
    //     //Get Ceck Mode
    //     var New_height = 0;
    //     var New_width = 0;
    //     if (image_mode == "LANDSCAPE") {
    //       New_height = image_height;
    //       New_width = image_width;
    //     } else if (image_mode == "POTRET") {
    //       New_height = image_height;
    //       New_width = image_width;
    //     }
    
    //     //Convert Image
    //     const buffers_file = await webp.buffer2webpbuffer(file.buffer, format, "-q 70", this.configService.get("PATH_UPLOAD"));
    //     var file_commpress = buffers_file;
    
    //     //Convert Image Orientation
    //     var file_commpress = null;
    //     if (image_orientation == 1) {
    //       file_commpress = await sharp(buffers_file).resize(Math.round(New_width), Math.round(New_height)).toBuffer();
    //     } else if (image_orientation == 6) {
    //       file_commpress = await sharp(buffers_file).rotate(90).resize(Math.round(New_height), Math.round(New_width)).toBuffer();
    //     } else if (image_orientation == 8) {
    //       file_commpress = await sharp(buffers_file).rotate(270).resize(Math.round(New_height), Math.round(New_width)).toBuffer();
    //     } else {
    //       file_commpress = buffers_file;
    //     }
    
    //     if (await this.createFolder('./temp/', path)) {
    //       fs.writeFile("./temp/" + path + "/" + filename + "." + format, file_commpress, function (err) {
    //         if (err) {
    //           return console.log(err);
    //         }
    //         console.log("The file was saved!");
    //       });
    //     }
    //     return file_commpress;
    //   }

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
