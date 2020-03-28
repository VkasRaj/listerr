import { Resolver, Authorized, Mutation, Arg } from "type-graphql";
import { AuthRolesEnum } from "../user/user.schema";
import { TitleAndDescSchema } from "./shared.schema";
import { SharedService } from "./shared.service";
import { FindEntityInput, ClosedInput, Entity } from "./shared.dto";

@Resolver()
export class SharedResolver {
    constructor(private sharedService: SharedService) {}

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Boolean, {
        nullable: true,
        description: "For closing/reopening a particular issue/project",
    })
    closeOrOpen(
        @Arg("where") where: FindEntityInput,
        @Arg("data") data: ClosedInput
    ) {
        return this.sharedService.closedOrOpen(where, data);
    }

    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Mutation(() => Entity, {
        nullable: true,
        description:
            "For updating title and description of a particular issue/project",
    })
    updateTitleAndDescription(
        @Arg("where") where: FindEntityInput,
        @Arg("data") data: TitleAndDescSchema
    ) {
        return this.sharedService.updateTitleAndDescription(where, data);
    }
}
