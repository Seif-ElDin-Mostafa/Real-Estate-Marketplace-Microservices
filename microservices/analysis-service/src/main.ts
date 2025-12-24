import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Using port 3005 as planned
    await app.listen(process.env.PORT || 3005);
    console.log(`Analysis Service is running on: ${await app.getUrl()}`);
}
bootstrap();
