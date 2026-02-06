import { Injectable } from "@nestjs/common";
import { CreateOrgDto } from "./orgDto/org.dto";
import { Org } from "./interface/org.interface";

@Injectable()
export class OrgService {

    async createOrg(orgDetails: CreateOrgDto, userId: number): Promise<Org> {
        // NEED TO USE TRANSACTION HERE
        // create org in db
        // use the org_id and user_id from jwt to add in user_organization table with role OWNER
        return {id:1, name: "name"};
    }

    async findOrgsForUser(userId: number): Promise<Org[]> {
        return [];
    }

    async orgDetails(orgId: number, userId: number): Promise<Org>{
        // check if user with userId belongs to a org with id orgId
        return {id:orgId, name:"org"};
    }

    async orgExpenses( orgId: Org["id"], userId: number ): Promise<string> {
        // check if user with userId belongs to a org with id orgId
        return "expenses"
    }
}
