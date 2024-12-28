// MUI Imports
import { IPFS } from "@/constants";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const CardCourse = (data: any) => {

  return (
    <Card>
      <CardMedia image={IPFS(data?.logo ?? '')} className="bs-[180px]" />
      <CardContent className="relative">
        <div className="flex justify-between items-center flex-wrap gap-x-4 gap-y-2 mbe-5 mbs-[30px]">
          <div className="flex flex-col items-start">
            <Typography variant="h5">{data?.name ?? ''}</Typography>
            <Typography variant="body2">{data?.tags?.join(',')}</Typography>
          </div>
          <Link href={`/courses/${data?.id}`}><Button variant="contained">View</Button></Link>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-x-4 gap-y-2">
          <Typography variant="subtitle2" color="text.disabled">
            {data?.description.slice(0, 100) ?? ''}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardCourse;
