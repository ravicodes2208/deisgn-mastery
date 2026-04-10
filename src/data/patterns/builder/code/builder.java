import java.util.Optional;

/**
 * Builder Pattern -- Meal Ordering System
 *
 * Product:   Meal (immutable, private constructor)
 * Builder:   Meal.Builder (static inner class, fluent API, ALL fields via setters)
 * Director:  MealRecipes (reusable build sequences)
 */
public class builder {

    // ─── Product ────────────────────────────────────────────────────────
    static final class Meal {
        private final String bun;
        private final int pattyCount;
        private final String cheese;
        private final String sauce;
        private final boolean lettuce;
        private final boolean tomato;
        private final boolean bacon;
        private final String size;     // "small", "medium", "large"
        private final double price;    // computed

        // Only Builder can call this
        private Meal(Builder b) {
            this.bun        = b.bun;
            this.pattyCount = b.pattyCount;
            this.cheese     = b.cheese;
            this.sauce      = b.sauce;
            this.lettuce    = b.lettuce;
            this.tomato     = b.tomato;
            this.bacon      = b.bacon;
            this.size       = b.size;
            this.price      = computePrice();
        }

        private double computePrice() {
            double base = switch (size) {
                case "small"  -> 3.99;
                case "medium" -> 5.99;
                case "large"  -> 7.99;
                default       -> 5.99;
            };
            base += (pattyCount - 1) * 2.00;       // extra patties
            if (cheese != null) base += 0.75;
            if (bacon)          base += 1.50;
            if (lettuce)        base += 0.25;
            if (tomato)         base += 0.25;
            return Math.round(base * 100.0) / 100.0;
        }

        // ── Getters ─────────────────────────────────────────────────────
        public String            getBun()        { return bun; }
        public int               getPattyCount() { return pattyCount; }
        public Optional<String>  getCheese()     { return Optional.ofNullable(cheese); }
        public Optional<String>  getSauce()      { return Optional.ofNullable(sauce); }
        public boolean           hasLettuce()    { return lettuce; }
        public boolean           hasTomato()     { return tomato; }
        public boolean           hasBacon()      { return bacon; }
        public String            getSize()       { return size; }
        public double            getPrice()      { return price; }

        @Override
        public String toString() {
            return String.format("[MEAL] %s bun, %d patties, %s cheese, %s sauce, %s -- $%.2f",
                    bun, pattyCount,
                    cheese != null ? cheese : "no",
                    sauce  != null ? sauce  : "no",
                    size, price);
        }

        // ─── Builder (static inner class) ───────────────────────────────
        public static class Builder {
            private String  bun;
            private int     pattyCount;
            private String  cheese;
            private String  sauce;
            private boolean lettuce;
            private boolean tomato;
            private boolean bacon;
            private String  size;

            // ALL fields via setters -- no constructor params

            public Builder bun(String bun)            { this.bun = bun;             return this; }
            public Builder pattyCount(int count)      { this.pattyCount = count;    return this; }
            public Builder cheese(String cheese)      { this.cheese = cheese;       return this; }
            public Builder sauce(String sauce)        { this.sauce = sauce;         return this; }
            public Builder lettuce(boolean lettuce)   { this.lettuce = lettuce;     return this; }
            public Builder tomato(boolean tomato)     { this.tomato = tomato;       return this; }
            public Builder bacon(boolean bacon)       { this.bacon = bacon;         return this; }
            public Builder size(String size)          { this.size = size;           return this; }

            public Meal build() {
                // ── Validation (the GATEKEEPER) ─────────────────────────
                if (bun == null || bun.isBlank())
                    throw new IllegalStateException("Bun is required");
                if (size == null || size.isBlank())
                    throw new IllegalStateException("Size is required");
                if (pattyCount < 1)
                    throw new IllegalStateException("At least 1 patty is required");
                if (bun.equalsIgnoreCase("gluten-free") && bacon)
                    throw new IllegalStateException("Gluten-free bun cannot be combined with bacon");

                return new Meal(this);
            }
        }
    }

    // ─── Director ───────────────────────────────────────────────────────
    static class MealRecipes {

        public static Meal kidsMeal() {
            return new Meal.Builder()
                    .bun("sesame")
                    .pattyCount(1)
                    .cheese("american")
                    .sauce("ketchup")
                    .lettuce(false)
                    .tomato(false)
                    .bacon(false)
                    .size("small")
                    .build();
        }

        public static Meal gourmetBurger() {
            return new Meal.Builder()
                    .bun("brioche")
                    .pattyCount(2)
                    .cheese("gruyere")
                    .sauce("truffle aioli")
                    .lettuce(true)
                    .tomato(true)
                    .bacon(true)
                    .size("large")
                    .build();
        }
    }

    // ─── Main ───────────────────────────────────────────────────────────
    public static void main(String[] args) {

        // 1. Director-built meals
        Meal kids    = MealRecipes.kidsMeal();
        Meal gourmet = MealRecipes.gourmetBurger();

        // 2. Custom meal via Builder directly
        Meal custom = new Meal.Builder()
                .bun("whole wheat")
                .pattyCount(3)
                .cheese("pepper jack")
                .sauce("BBQ")
                .lettuce(true)
                .tomato(true)
                .bacon(true)
                .size("medium")
                .build();

        System.out.println(kids);
        System.out.println(gourmet);
        System.out.println(custom);

        // 3. Demonstrate validation failure
        try {
            new Meal.Builder()
                    .bun("gluten-free")
                    .pattyCount(1)
                    .bacon(true)
                    .size("small")
                    .build();
        } catch (IllegalStateException e) {
            System.out.println("[ERROR] " + e.getMessage());
        }
    }
}
