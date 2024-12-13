import React, { HTMLAttributes, ReactNode } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui/components/button/button';

interface DashboardProps extends HTMLAttributes<HTMLElement> {
    children:ReactNode,
}

export function Dashboard({children,...props}:DashboardProps){

    return(
        <div className="dashboard" {...props}>
            {children}
        </div>
    );
};

type DashboardLeftProps = {
    children:ReactNode,
};

export function DashboardLeft({children}:DashboardLeftProps){
    return(
        <div className='p-32 dash__left box'>
            <div className='dash__left__inner flex-col g-64'>{children}</div>
    </div>
    );
};

type DashBoardMenuProps = {
    children:ReactNode,
};


export function DashboardMenu({children}:DashBoardMenuProps){

    return(
        <div className='dash__menu flex-col g-16 tx-white'>{children}</div>
    );
};

interface DashboardMeuItemProps extends HTMLAttributes<HTMLElement> {
    children:ReactNode,
    path:string,
};

export function DashboardMeuItem({children,path, ...props}:DashboardMeuItemProps){

    return(
        <Link to={path} className='dash--menu--item' {...props}><Button variant='ternary' size='small'>{children}</Button></Link>
    );
};

type DashboardRightProps = {
    children:ReactNode,
};

export function DashboardRight({children}:DashboardRightProps){
    return(
        <div className='p-32 box dash__right'>{children}</div>
    );
};