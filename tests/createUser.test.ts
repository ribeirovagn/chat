import UserCreate from "../src/application/useCases/UserCreate";
import UserRepositoryPostgres from "../src/infra/repository/postgres/UserRepositoryPostgres"

test("Deve criar um usuario", async () => {
  
    const userRepository = new UserRepositoryPostgres();
    const createUser = new UserCreate(userRepository);

    const input1 = {
        name: "Vagner Ribeiro",
        email: "vagn.fedora@gmail.com",
        id: "d290f1ee-6c54-4b01-90e6-d701748f0852"
    };

    const output = await createUser.execute(input1);

    const input2 = {
        name: "Ribeiro Fedora",
        email: "ribeirovagn@gmail.com",
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851"        
    }

    await createUser.execute(input2);
    
})