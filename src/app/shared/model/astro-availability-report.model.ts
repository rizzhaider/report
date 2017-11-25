import { AstroAvailabilityEvents } from './astro-availability-events.model';
export class AstroAvailabilityReport {
    status: boolean;
    report: AstroAvailabilityEvents;
    hourlyReport: {hour:number, duration: string, report: AstroAvailabilityEvents }[]
}
