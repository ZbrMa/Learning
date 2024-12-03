import React, { ReactNode } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui/components/button/button';

type DashboardProps = {
    children:ReactNode
}

export function Dashboard({children}:DashboardProps){

    return(
        <div className="dashboard">
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

type DashboardMeuItemProps = {
    children:ReactNode,
    path:string,
};

export function DashboardMeuItem({children,path}:DashboardMeuItemProps){

    return(
        <Link to={path} className='dash--menu--item'><Button variant='ternary' size='small'>{children}</Button></Link>
    );
};

type DashboardRightProps = {
    children:ReactNode,
};

export function DashboardRight({children}:DashboardRightProps){
    return(
        <div className='p-32 box'>{children}</div>
    );
};