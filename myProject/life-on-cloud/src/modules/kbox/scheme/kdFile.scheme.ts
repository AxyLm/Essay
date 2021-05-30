import { SchemaFactory } from "@nestjs/mongoose";
import { kdFile } from "../interface/kdFile.interface";

export const kdFileScheme = SchemaFactory.createForClass(kdFile)