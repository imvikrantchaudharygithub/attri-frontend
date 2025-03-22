import Link from "next/link";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";


export default function StickyBar() {
    return (
        <>
            <section className="bottom-sticky d-flex align">
                <div className="attrixsheading">2 Item</div>
                <a href="/cart" className="anchor-button hovertime">View Cart</a>
            </section>
        </>
  );
}