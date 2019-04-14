import { Request, Response } from 'express';

export type RouteAction = (Request, Response) => any;

export interface Route {
  path: string,
  method: string,
  action: RouteAction,
};