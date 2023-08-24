import {OpenAIApi, Configuration} from 'openai';


export class OpenAiService {
    private static instance: OpenAiService;
    private openAi: OpenAIApi;

    private constructor() {
        this.openAi = new OpenAIApi(new Configuration(
            {
                apiKey: process.env.OPENAI_API_KEY,
            }
        ));
    }

    public static getInstance(): OpenAiService {
        if (!OpenAiService.instance) {
            OpenAiService.instance = new OpenAiService();
        }

        return OpenAiService.instance;
    }

    public async getCompletion(prompt: string): Promise<string> {
        console.log(prompt)
        try {
            const response = await this.openAi.createCompletion({
                model: 'gpt-4',
                prompt: prompt,
            }) as any;

            console.log('response', response.data.choices[0].message.content)

            return response.data.choices[0].message.content;
        } catch (e: any) {
            console.log(e)
            console.log(e.data.error);
            return "Sorry, something went wrong.";
        }
    }
}