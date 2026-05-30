import Icon from './icons';

export interface HeaderProps{
	title: string;
}

const Header = ({title}: HeaderProps) => {
	
	return(
		<div class="header">
			<h1><Icon content="stop-watch" size="2em"/> {title} <Icon content="stop-watch" size="2em"/></h1>
		</div>
	)
};


export default Header;
