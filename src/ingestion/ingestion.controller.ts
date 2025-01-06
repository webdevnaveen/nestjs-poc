import { Controller, Post, Get, Param, Patch, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post('trigger')
  triggerIngestion(@Body() body: { triggeredBy: string }) {
    return this.ingestionService.triggerIngestion(body.triggeredBy);
  }

  @Get()
  getAllIngestions() {
    return this.ingestionService.getAllIngestions();
  }

  @Get(':id')
  getIngestionById(@Param('id') id: string) {
    return this.ingestionService.getIngestionById(id);
  }

  @Patch(':id/status')
  updateIngestionStatus(@Param('id') id: string, @Body() body: { status: string; errorMessage?: string }) {
    return this.ingestionService.updateIngestionStatus(id, body.status, body.errorMessage);
  }
}
