
export function createSession(station, plan) {

    return {

        id: crypto.randomUUID(),

        stationId: station.id,

        stationName: station.name,

        plan: {

            id: plan.id,

            name: plan.name,

            minutes: plan.minutes,

            price: plan.price

        },

        startTime: null,

        expectedEndTime: null,
        remainingSeconds: plan.minutes * 0.1,

        extras: [],

        products: [],

        paymentMethod: null,

        totals: {

            game: plan.price,

            extras: 0,

            products: 0,

            total: plan.price

        },

        status: "active"

    };

}
export function recalculateSessionTotals(session) {

    const extrasTotal = session.extras.reduce(

        (total, extra) => total + extra.price,

        0

    );

    const productsTotal = session.products.reduce(

        (total, product) => total + product.price,

        0

    );

    session.totals = {

        game: session.plan.price,

        extras: extrasTotal,

        products: productsTotal,

        total:

            session.plan.price +

            extrasTotal +

            productsTotal

    };

    return session;

}
export function addExtraTime(session, minutes, price) {

    session.extras.push({

        id: crypto.randomUUID(),

        type: "time",

        name: `+${minutes} minutos`,

        minutes,

        price

    });

    session.remainingSeconds += minutes * 60;

    recalculateSessionTotals(session);

    return session;

}
export function addProductToSession(session, product) {

    session.products.push({

        id: crypto.randomUUID(),

        productId: product.id,

        name: product.name,

        price: product.price,

        quantity: 1

    });

    recalculateSessionTotals(session);

    return session;

}