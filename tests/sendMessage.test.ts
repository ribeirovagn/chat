import SendMessage from "../src/application/useCases/SendMessage";
import RabbitMQConnection from "../src/infra/queue/rabbitMQ/RabbitMQConnection";
import RabbitMQProducer from "../src/infra/queue/rabbitMQ/RabbitMQProducer";

test("Deve enviar uma mensagem", async () => {

    const producer = new RabbitMQProducer();
    const sendMessage = new SendMessage(producer);

    const input = {
        sender: {
            name: "Vagner Ribeiro",
            email: "ribeirovagn@gmail.com"
        },
        recipient: {
            name: "Fedora Ribeiro",
            email: "vagn.fedora@gmail.com"
        },
        message: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
    }

    const output = await sendMessage.execute(input);
    console.log(output)
});