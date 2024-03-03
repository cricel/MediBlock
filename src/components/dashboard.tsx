"use client";

import { useEffect, useState } from 'react';
import { supabase } from "@/components/utils/supabaseClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Navbar } from './navbar';

export default function Dashboard() {
  const [userdata, setUserData] = useState<null | any[]>(null);

  async function handleBuy(id: string, price: number): Promise<void> {
    await supabase.rpc('update_researcher_data', { uuid_to_add: id, price_to_subtract: price });
  }
  

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from('userdata')
        .select('*');
      if (error) console.error('error', error);
      else setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-3 text-sm font-medium" href="#">
            Home
          </Link>
          <h1 className="text-lg font-semibold tracking-tighter">User&apos;s Medical History</h1>
        </div>
        <div className="grid gap-4">
          {userdata && userdata.map((user, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4">
                <div className="grid gap-1">
                  <div className="font-semibold">{`Diagnosed with: ${user.disorder}`}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{`Last updated: ${new Date(user.last_updated).toLocaleDateString()}`}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{`Location ${user.location}`}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{`Gender ${user.gender}`}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{`Price for data $${user.price}`}</div>
                </div>
                <Button size="sm" onClick={handleBuy.bind(null, user.id, user.price)}>Buy</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
