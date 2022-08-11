import { makeVar, ReactiveVar } from "@apollo/client";
import { Auth } from "../../models/auth.model";

const authInitialValue = null;

export const authState: ReactiveVar<Auth | null> = makeVar<Auth | null>(authInitialValue);
