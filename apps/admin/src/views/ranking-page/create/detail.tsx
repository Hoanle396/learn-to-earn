"use client"
import { useRankingDetail } from "@/@core/apis/ranking"
import { IPFS } from "@/constants"
import { Box, Card, CardContent, Typography, Chip } from "@mui/material"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

const DetailPool = () => {
  const { id } = useParams()
  const { push } = useRouter()
  const { data: { data } = { data: {} }, isLoading, isError } = useRankingDetail(Number(id))
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    push('/ranking')
  }
  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Image
            src={IPFS(data?.logo)}
            alt={data.name}
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Created At: {data.createdAt}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Updated At: {data.updatedAt}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Start Time: {data.startTime}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          End Time: {data.endTime}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Questions Per Pool: {data.questionPerPool}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Verified: {data.isVerified ? "Yes" : "No"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Tags:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data?.tags?.map((tag: any, index: number) => (
              <Chip key={index} label={tag} />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DetailPool
