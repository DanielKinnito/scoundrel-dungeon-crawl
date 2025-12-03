import { db } from "@/lib/db";
import { leaderboard, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export async function Leaderboard() {
    const scores = await db
        .select({
            name: user.name,
            score: leaderboard.score,
        })
        .from(leaderboard)
        .innerJoin(user, eq(leaderboard.userId, user.id))
        .orderBy(desc(leaderboard.score))
        .limit(10);

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {scores.map((entry, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{entry.name}</TableCell>
                            <TableCell className="text-right">{entry.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
