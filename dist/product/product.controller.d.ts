/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Tbl_product } from 'src/product/product.entity';
import { EngineService } from 'src/engine/engine.service';
import { ConfigService } from '@nestjs/config';
import { ProductbarcodeService } from 'src/product/productbarcode.service';
import { CreateProductbarcodeDto } from 'src/product/dto/create-productbarcode.dto';
export declare class ProductController {
    private readonly ProductService;
    private readonly ProductbarcodeService;
    private readonly EngineService;
    private readonly configService;
    constructor(ProductService: ProductService, ProductbarcodeService: ProductbarcodeService, EngineService: EngineService, configService: ConfigService);
    findAll(): Promise<Tbl_product[]>;
    create(file: Express.Multer.File, CreateProductDto_: CreateProductDto, request: any): Promise<{
        response_code: number;
        data: Tbl_product;
        messages: {
            info: string[];
        };
    }>;
    update(file: Express.Multer.File, CreateProductDto_: CreateProductDto, request: any): Promise<{
        response_code: number;
        data: Tbl_product;
        messages: {
            info: string[];
        };
    }>;
    create2(res: any, CreateProductbarcodeDto: CreateProductbarcodeDto, req: any): Promise<void>;
    update3(res: any, CreateProductbarcodeDto: CreateProductbarcodeDto, request: any): Promise<void>;
    findWhereCompany5(request: Request): Promise<{}>;
    delete2(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany(request: Request): Promise<{}>;
    getPict(id: string, response: any): Promise<void>;
    delete(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    findWhereCompany3(request: Request): Promise<{}>;
}
