import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import { Middleware } from "routing-controllers";
import { ValidationException } from "../models";
import { Service } from "typedi";

@Service()
@Middleware({ type: "before" })
export class ValidationMiddleware {}
