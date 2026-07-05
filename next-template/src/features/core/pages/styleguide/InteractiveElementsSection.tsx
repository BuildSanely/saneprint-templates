import {
	CheckCircle,
	Compass,
	HardDrive,
	Info,
	Shapes,
	Sparkle,
	Warning,
	WarningCircle,
} from '@phosphor-icons/react/dist/ssr';

import {
	Button,
	Checkbox,
	DropdownMenu,
	Input,
	Modal,
	SearchBar,
	Select,
	ToastShowcase,
	Tooltip,
} from '@core';

import { StyleguideBadge, StyleguideSection } from './StyleguidePrimitives';

const activityItems = [
	{
		icon: CheckCircle,
		text: 'Project "Dashboard" created',
		time: '2 hours ago',
		variant: 'success' as const,
	},
	{
		icon: Sparkle,
		text: 'Theme updated to v2.0',
		time: '5 hours ago',
		variant: 'brand' as const,
	},
	{
		icon: WarningCircle,
		text: 'API rate limit warning',
		time: '1 day ago',
		variant: 'warning' as const,
	},
];

export function InteractiveElementsSection() {
	return (
		<StyleguideSection
			title='Interactive Elements'
			icon={Shapes}
			description='Versatile button variants with clear visual hierarchy and feedback states.'
		>
			<div className='space-y-12'>
				<div className='space-y-6'>
					<div className='flex items-center gap-3'>
						<h4 className='heading-5 text-foreground'>Button Variants</h4>
						<StyleguideBadge>Primary</StyleguideBadge>
					</div>
					<div className='flex flex-wrap items-center gap-4'>
						<Button>Primary Action</Button>
						<Button variant='outlined'>Secondary Action</Button>
						<Button variant='ghost'>Ghost Button</Button>
					</div>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center gap-3'>
						<h4 className='heading-5 text-foreground'>Intent Variants</h4>
						<StyleguideBadge variant='danger'>Semantic</StyleguideBadge>
					</div>
					<div className='flex flex-wrap items-center gap-4'>
						<Button intent='danger' leftIcon={<Warning size={18} weight='bold' />}>
							Delete Project
						</Button>
						<Button intent='secondary' leftIcon={<Info size={18} weight='bold' />}>
							Learn More
						</Button>
					</div>
				</div>

				<div className='space-y-6'>
					<h4 className='heading-5 text-foreground'>Form Components</h4>
					<div className='grid gap-8 lg:grid-cols-2'>
						<div className='space-y-6'>
							<Input
								label='Project Name'
								placeholder='Enter project name...'
								className='rounded-xl'
							/>
							<Select
								label='Project Type'
								placeholder='Select type...'
								options={[
									{ label: 'Web Application', value: 'web' },
									{ label: 'Mobile App', value: 'mobile' },
									{ label: 'API Service', value: 'api' },
								]}
							/>
							<SearchBar placeholder='Search projects, teams, files...' />
						</div>
						<div className='border-border/50 bg-surface flex flex-col justify-center gap-6 rounded-2xl border p-8'>
							<div className='flex items-center gap-4'>
								<Checkbox label='Enable notifications' defaultChecked />
								<Tooltip
									trigger={<Info size={18} className='text-muted' />}
									content='Receive email updates'
								/>
							</div>
							<div className='flex items-center gap-4'>
								<Checkbox label='Public visibility' />
								<Tooltip
									trigger={<Info size={18} className='text-muted' />}
									content='Make project visible to everyone'
								/>
							</div>
							<div className='flex items-center gap-4'>
								<Checkbox label='Auto-save enabled' defaultChecked />
								<Tooltip
									trigger={<Info size={18} className='text-muted' />}
									content='Automatically save changes'
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-6'>
					<h4 className='heading-5 text-foreground'>Advanced Components</h4>
					<div className='flex flex-wrap gap-4'>
						<DropdownMenu
							trigger={
								<Button variant='outlined' leftIcon={<Compass size={18} />}>
									Settings Menu
								</Button>
							}
							items={[
								{ label: 'Profile Settings' },
								{ label: 'Team Management' },
								{ label: 'Billing & Plans' },
								{ label: 'Sign Out', tone: 'danger' },
							]}
						/>
						<Modal
							trigger={
								<Button intent='secondary' leftIcon={<HardDrive size={18} />}>
									View Activity Log
								</Button>
							}
							title='Recent Activity'
							description='Track all changes and events in your workspace'
							footer={<Button>Close</Button>}
						>
							<div className='space-y-3 py-4'>
								{activityItems.map((item) => (
									<div
										key={item.text}
										className='border-border/50 bg-surface flex items-start gap-4 rounded-xl border p-4'
									>
										<item.icon
											size={20}
											className='text-brand mt-0.5 shrink-0'
											weight='duotone'
										/>
										<div className='flex-1 space-y-1'>
											<p className='body-sm text-foreground'>{item.text}</p>
											<p className='caption text-muted'>{item.time}</p>
										</div>
										<StyleguideBadge variant={item.variant}>New</StyleguideBadge>
									</div>
								))}
							</div>
						</Modal>
						<ToastShowcase />
					</div>
				</div>
			</div>
		</StyleguideSection>
	);
}
