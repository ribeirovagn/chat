import UserCreate from "../src/application/useCases/UserCreate";
import PoolConnection from "../src/infra/repository/postgres/PoolConnection";
import UserRepositoryPostgres from "../src/infra/repository/postgres/UserRepositoryPostgres"

test("Criar novos usuários", async () => {
  
    const databaseConnection = new PoolConnection();
    const userRepository = new UserRepositoryPostgres(databaseConnection);
    const createUser = new UserCreate(userRepository);

    const input1 = {
        name: "Vagner Ribeiro",
        email: "vagn.fedora@gmail.com",
        id: "d290f1ee-6c54-4b01-90e6-d701748f0852"
    };

    
    const input2 = {
        name: "Ribeiro Fedora",
        email: "ribeirovagn@gmail.com",
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851"        
    }
    
    try {
        const output1 = await createUser.execute(input1);
        expect(output1.name).toBe("Vagner Ribeiro");
        expect(output1.email).toBe("vagn.fedora@gmail.com");
        expect(output1.id).toBe("d290f1ee-6c54-4b01-90e6-d701748f0852");

        const output2 = await createUser.execute(input2);
        expect(output1.name).toBe("Ribeiro Fedora");
        expect(output1.email).toBe("ribeirovagn@gmail.com");
        expect(output1.id).toBe("d290f1ee-6c54-4b01-90e6-d701748f0851");

    } catch (error: any) {
        expect(error.message).toBe(`Erro: duplicate key value violates unique constraint "users_pkey"`)
    }

    await databaseConnection.close();
    
});
