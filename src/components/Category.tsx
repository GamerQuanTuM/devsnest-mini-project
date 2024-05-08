import React, { useEffect, useState } from 'react';
import type { Category as PrismaCategory, User as PrismaUser } from '@prisma/client';
import { UserResource } from "@clerk/types";
import { axiosInstance } from '@/lib/axiosInstance';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from './ui/checkbox';

interface PrismaUserWithCategory extends PrismaUser {
    categories: PrismaCategory[];
}

type Props = {
    category: PrismaCategory;
    user: UserResource;
}

export default function Category({ category, user }: Props) {
    const [dbUser, setDbUser] = useState<PrismaUserWithCategory | null>(null);
    const [checkedCategory, setCheckedCategory] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            if (!user?.id) {
                return;
            }
            try {
                const { data } = await axiosInstance.post("/user/user-details", {
                    clerkId: user?.id
                });
                setDbUser(data.message);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getUserDetails();
    }, [user]);

    useEffect(() => {
        if (dbUser) {
            const isCategoryChecked = dbUser.categories.some(cat => cat.id === category.id);
            setCheckedCategory(isCategoryChecked);
        }
    }, [dbUser, category]);

    const handleSelect = async (e: CheckedState, categoryId: number) => {
        try {
            if (!user?.id) {
                return;
            }
            if (e === true) {
                await axiosInstance.post("/user/add-category", {
                    clerkId: user.id,
                    categoryId
                });
                setCheckedCategory(true);
            } else {
                await axiosInstance.post("/user/remove-category", {
                    clerkId: user.id,
                    categoryId
                });
                setCheckedCategory(false);
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div key={category.id} className='flex items-center gap-x-3 mt-2'>
            <Checkbox
                checked={checkedCategory}
                onCheckedChange={(e) => handleSelect(e, category?.id)}
            />
            <p className='text-base font-normal'>{category?.name}</p>
        </div>
    );
}
