/**
 * APPLICATION ENTRY POINT
 */

import { container } from './config/container';
import { RestApiAdapter } from './adapters/in/RestApiAdapter';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Wire up dependencies
const financeService = container.getFinanceService();
const apiAdapter = new RestApiAdapter(financeService, financeService, financeService);

// Start server
apiAdapter.start(port);
