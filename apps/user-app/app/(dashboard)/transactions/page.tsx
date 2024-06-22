import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2pTransactions } from "../../../components/P2pTransactions";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getp2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                {toUserId: Number(session?.user?.id)},
                {fromUserId: Number(session?.user?.id)},
            ]
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount : t.amount,
        type: (session?.user?.id == t.fromUserId)? "Debit": "Credit",
        with: (session?.user?.id == t.fromUserId)? t.toUserId : t.fromUserId
    }))
}


export default async function() {
    const balance = await getBalance();
    const transactions = await getp2pTransactions();
    return <div className="w-full">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transaction
        </div>
        <div className="w-full border p-4">
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <P2pTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}