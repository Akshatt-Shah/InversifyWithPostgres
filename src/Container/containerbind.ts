import { Container } from "inversify";
import { UserServices } from "../Services";
import { ActorProducerServices } from "../Services";
import { TheatorService } from "../Services";
// import { UserController } from "../Controlleres";
import { TYPES } from "../Types/types";
import { VerifyToken } from "../Middlewares/Verify.Middleware";
import { VerifyAdminToken } from "../Middlewares/VerifyAdmin.Middleware";
import { VerifyUserToken } from "../Middlewares/VerifyUser.Middleware";
import { VerifyDirectorToken } from "../Middlewares/VerifyDirector.Middleware";
const container = new Container();

// container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<UserServices>(TYPES.UserServices).to(UserServices);
container.bind<VerifyToken>(TYPES.VerifyToken).to(VerifyToken);
container.bind<VerifyAdminToken>(TYPES.VerifyAdminTokens).to(VerifyAdminToken);
container.bind<VerifyUserToken>(TYPES.VerifyUserTokens).to(VerifyUserToken);
container.bind<VerifyDirectorToken>(TYPES.VerifyDirectorToken).to(VerifyDirectorToken);
container.bind<ActorProducerServices>(TYPES.ActorProducerServices).to(ActorProducerServices);
container.bind<TheatorService>(TYPES.TheatorService).to(TheatorService);

export { container };
