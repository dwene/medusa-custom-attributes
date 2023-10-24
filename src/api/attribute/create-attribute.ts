import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";
import { AttributeType } from "../../models/attribute";
import { validator } from "@medusajs/medusa/dist/utils";
import AttributeService from "../../services/attribute";
import { AttributeValue } from "../../models/attribute-value";

export default async (req, res) => {
  const validated = await validator(AdminCreateAttributeReq, req.body);
  const attributeService: AttributeService =
    req.scope.resolve("attributeService");

  res.json({ attribute: await attributeService.create(validated) });
};

export class AttributeValueReq {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  value: string;

  @IsNumber()
  @Type(() => Number)
  rank: number;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class AdminCreateAttributeReq {
  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  max_value_quantity?: number;

  @IsOptional()
  @Type(() => Boolean)
  filterable?: boolean;

  @IsEnum(AttributeType)
  type: AttributeType;

  @Type(() => AttributeValueReq)
  @ValidateNested({ each: true })
  @IsArray()
  values: AttributeValue[];

  @IsOptional()
  handle?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;

  @IsString({ each: true })
  categories: string[];
}