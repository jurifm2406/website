import type Pocketbase from "pocketbase"

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            pb: Pocketbase
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export type {};
