// MUI Imports
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Component Imports
import Link from "@components/Link";
import Form from "@components/Form";

// Style Imports
import tableStyles from "@core/styles/table.module.css";

type TableDataType = {
	type: string;
	app: boolean;
	email: boolean;
	browser: boolean;
};

// Vars
const tableData: TableDataType[] = [
	{
		app: true,
		email: true,
		browser: true,
		type: "New for you",
	},
	{
		app: true,
		email: true,
		browser: true,
		type: "Account activity",
	},
	{
		app: false,
		email: true,
		browser: true,
		type: "A new browser used to sign in",
	},
	{
		app: false,
		email: true,
		browser: false,
		type: "A new device is linked",
	},
];

const Notifications = () => {
	return (
		<Card>
			<CardHeader
				title="Recent Devices"
				subheader={
					<>
						We need permission from your browser to show notifications.
						<Link className="text-primary"> Request Permission</Link>
					</>
				}
			/>

		</Card>
	);
};

export default Notifications;
