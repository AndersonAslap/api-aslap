import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';

@ApiSchema({ name: 'Risco Carteira Digital' })
export class RiskDigitalWalletDto {
  // TODO digitalWallet
  digitalWallet: undefined;

  // TODO coverages
  coverages: undefined;
}
