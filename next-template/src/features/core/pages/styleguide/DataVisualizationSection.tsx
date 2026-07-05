import { Fingerprint } from '@phosphor-icons/react/dist/ssr';

import { DataTableShowcase } from '@core';

import { StyleguideSection } from './StyleguidePrimitives';

export function DataVisualizationSection() {
	return (
		<StyleguideSection
			title='Data Visualization'
			icon={Fingerprint}
			description='Complex data structures presented with clarity and scalability in mind.'
		>
			<DataTableShowcase />
		</StyleguideSection>
	);
}
