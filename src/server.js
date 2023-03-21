import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); //this line input the environment variables

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.status(200).send({ message: 'hello from server!' });
});

app.post('/', async (req, res) => {
	try {
		const { prompt } = res.body;
		const responce = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: `${prompt}`,
			temperature: 0.7,
			max_tokens: 3000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});
		res.status(200).send({ bot: responce.data.choices[0].text });
	} catch (error) {
		console.log('failed to post prompt error: ', error);
		res.status(500).send({ error });
	}
});

app.listen(5000, () =>
	console.log('server is running on port http://localhost:5000 🚀 '),
);
