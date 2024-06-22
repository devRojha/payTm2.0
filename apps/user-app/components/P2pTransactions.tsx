import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        type: string,
        with : number,
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between mb-2 py-2 border-b border-slate-300">
                <div>
                    <div className="text-sm">
                        {(t.type == "Debit")?`Debit to ID : ${t.with}`:`Credit from ID : ${t.with}`}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {(t.type == "Debit")? "-":"+"} Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}