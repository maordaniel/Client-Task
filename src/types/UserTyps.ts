import data from "../assets/TemplateData.json";

export type UserType = typeof data;

export interface UsersType {
  [name: number]: UserType
}