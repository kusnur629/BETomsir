/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from 'src/product/product.service';
import { Tbl_product } from 'src/product/product.entity';
import { EngineService } from 'src/engine/engine.service';
import { ConfigService } from '@nestjs/config';
import { ProductbarcodeService } from 'src/product/productbarcode.service';
import { CreateProductbarcodeDto } from 'src/product/dto/create-productbarcode.dto';
import { BahanbakuproductService } from 'src/product/bahanbakuproduct.service';
import { CreateBahanbakuproductDto } from 'src/product/dto/create-bahanbakuproduct.dto';
import { ResepproductService } from 'src/product/resepproduct.service';
import { CreateResepproductDto } from 'src/product/dto/create-resepproduct.dto';
export declare class ProductController {
    private readonly ProductService;
    private readonly ProductbarcodeService;
    private readonly BahanbakuproductService;
    private readonly ResepproductService;
    private readonly EngineService;
    private readonly configService;
    constructor(ProductService: ProductService, ProductbarcodeService: ProductbarcodeService, BahanbakuproductService: BahanbakuproductService, ResepproductService: ResepproductService, EngineService: EngineService, configService: ConfigService);
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
    create3(res: any, CreateBahanbakuproductDto: CreateBahanbakuproductDto, req: any): Promise<void>;
    update4(res: any, CreateBahanbakuproductDto: CreateBahanbakuproductDto, request: any): Promise<void>;
    findWhereCompany55(request: Request): Promise<{}>;
    delete2f(id: string): Promise<{
        response_code: number;
        messages: {
            info: string[];
        };
    }>;
    create3t(res: any, CreateResepproductDto: CreateResepproductDto, req: any): Promise<void>;
    update45(res: any, CreateResepproductDto: CreateResepproductDto, request: any): Promise<void>;
    findWhereCompany554(request: Request): Promise<{}>;
    delete2ft(id: string): Promise<{
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
    barcode(idProduct: string, tBarcode: any[]): Promise<void>;
    bahanbaku(idProduct: string, tBahanbaku: any[]): Promise<void>;
    resep(idProduct: string, tResep: any[]): Promise<void>;
}
