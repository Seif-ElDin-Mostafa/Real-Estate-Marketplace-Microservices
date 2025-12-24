import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Using port 3004 as planned
    await app.listen(process.env.PORT || 3004);
    console.log(`Search Service is running on: ${await app.getUrl()}`);
}
bootstrap();
