import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { BeeBeaService } from 'src/beebea/beebea.service';

@Controller('beebea')
export class BeeBeaRouterController {
  constructor(
    @InjectPinoLogger(BeeBeaRouterController.name)
    private readonly _logger: PinoLogger,
    private readonly _beebeaService: BeeBeaService,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this._logger.info(`Find One Called with id: ${id}`);

    return await this._beebeaService.findOne(id);
  }
}
