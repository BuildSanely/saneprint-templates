import {
	BestPracticesSection,
	ColorSystemSection,
	DataVisualizationSection,
	InteractiveElementsSection,
	StyleguideHeader,
	TypographySection,
} from '@core/pages/styleguide';

export default function StyleguidePage() {
	return (
		<main className='selection:bg-brand/10 selection:text-brand relative min-h-screen bg-white'>
			<div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
				<StyleguideHeader />

				<div className='space-y-24'>
					<ColorSystemSection />
					<TypographySection />
					<InteractiveElementsSection />
					<DataVisualizationSection />
					<BestPracticesSection />
				</div>
			</div>
		</main>
	);
}
