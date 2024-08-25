import React from 'react';
import {Link} from 'react-router-dom';

// Définir le type pour chaque élément du breadcrumb
interface BreadcrumbLink {
	label: string;
	path: string;
}

// Définir le type des props du composant Breadcrumbs
interface BreadcrumbsProps {
	links: BreadcrumbLink[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({links}) => {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{links.map((link, index) => (
					<li
						key={index}
						className={`breadcrumb-item ${index === links.length - 1 ? 'active' : ''}`}
						aria-current={index === links.length - 1 ? 'page' : undefined}
					>
						{index === links.length - 1 ? (
							link.label
						) : (
							<Link to={link.path}>{link.label}</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
