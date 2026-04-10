#include <iostream>
#include <string>
#include <optional>
#include <stdexcept>
#include <cmath>
#include <iomanip>

/**
 * Builder Pattern -- Meal Ordering System (C++17)
 *
 * Product:   Meal (value type, private constructor, friend access)
 * Builder:   Meal::Builder (nested class, fluent API via *this)
 * Director:  MealRecipes (reusable build sequences)
 */

// ─── Product ────────────────────────────────────────────────────────────
class Meal {
public:
    class Builder;          // forward declaration
    friend class Builder;   // Builder can access private constructor

private:
    std::string             bun;
    int                     pattyCount;
    std::optional<std::string> cheese;
    std::optional<std::string> sauce;
    bool                    lettuce;
    bool                    tomato;
    bool                    bacon;
    std::string             size;
    double                  price;

    // Private constructor -- only Builder can call
    explicit Meal(const Builder& b);

    double computePrice() const {
        double base;
        if (size == "small")       base = 3.99;
        else if (size == "medium") base = 5.99;
        else if (size == "large")  base = 7.99;
        else                       base = 5.99;

        base += (pattyCount - 1) * 2.00;
        if (cheese.has_value()) base += 0.75;
        if (bacon)              base += 1.50;
        if (lettuce)            base += 0.25;
        if (tomato)             base += 0.25;
        return std::round(base * 100.0) / 100.0;
    }

public:
    // ── Getters ─────────────────────────────────────────────────────────
    const std::string&             getBun()        const { return bun; }
    int                            getPattyCount() const { return pattyCount; }
    const std::optional<std::string>& getCheese()  const { return cheese; }
    const std::optional<std::string>& getSauce()   const { return sauce; }
    bool                           hasLettuce()    const { return lettuce; }
    bool                           hasTomato()     const { return tomato; }
    bool                           hasBacon()      const { return bacon; }
    const std::string&             getSize()       const { return size; }
    double                         getPrice()      const { return price; }

    friend std::ostream& operator<<(std::ostream& os, const Meal& m) {
        os << "[MEAL] " << m.bun << " bun, "
           << m.pattyCount << " patties, "
           << (m.cheese.has_value() ? m.cheese.value() : "no") << " cheese, "
           << (m.sauce.has_value()  ? m.sauce.value()  : "no") << " sauce, "
           << m.size << " -- $"
           << std::fixed << std::setprecision(2) << m.price;
        return os;
    }

    // ─── Builder (nested class) ─────────────────────────────────────────
    class Builder {
        friend class Meal;

        std::string             bun_;
        int                     pattyCount_ = 0;
        std::optional<std::string> cheese_;
        std::optional<std::string> sauce_;
        bool                    lettuce_ = false;
        bool                    tomato_  = false;
        bool                    bacon_   = false;
        std::string             size_;

    public:
        // ALL fields via setters -- no constructor params

        Builder& bun(const std::string& b)       { bun_ = b;          return *this; }
        Builder& pattyCount(int c)                { pattyCount_ = c;   return *this; }
        Builder& cheese(const std::string& c)     { cheese_ = c;       return *this; }
        Builder& sauce(const std::string& s)      { sauce_ = s;        return *this; }
        Builder& lettuce(bool l)                  { lettuce_ = l;      return *this; }
        Builder& tomato(bool t)                   { tomato_ = t;       return *this; }
        Builder& bacon(bool b)                    { bacon_ = b;        return *this; }
        Builder& size(const std::string& s)       { size_ = s;         return *this; }

        Meal build() const {
            // ── Validation (the GATEKEEPER) ─────────────────────────────
            if (bun_.empty())
                throw std::invalid_argument("Bun is required");
            if (size_.empty())
                throw std::invalid_argument("Size is required");
            if (pattyCount_ < 1)
                throw std::invalid_argument("At least 1 patty is required");
            if (bun_ == "gluten-free" && bacon_)
                throw std::invalid_argument("Gluten-free bun cannot be combined with bacon");

            return Meal(*this);
        }
    };
};

// Private constructor definition
Meal::Meal(const Builder& b)
    : bun(b.bun_),
      pattyCount(b.pattyCount_),
      cheese(b.cheese_),
      sauce(b.sauce_),
      lettuce(b.lettuce_),
      tomato(b.tomato_),
      bacon(b.bacon_),
      size(b.size_),
      price(0.0)
{
    price = computePrice();
}

// ─── Director ───────────────────────────────────────────────────────────
class MealRecipes {
public:
    static Meal kidsMeal() {
        return Meal::Builder()
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

    static Meal gourmetBurger() {
        return Meal::Builder()
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
};

// ─── Main ───────────────────────────────────────────────────────────────
int main() {
    // 1. Director-built meals
    Meal kids    = MealRecipes::kidsMeal();
    Meal gourmet = MealRecipes::gourmetBurger();

    // 2. Custom meal via Builder directly
    Meal custom = Meal::Builder()
        .bun("whole wheat")
        .pattyCount(3)
        .cheese("pepper jack")
        .sauce("BBQ")
        .lettuce(true)
        .tomato(true)
        .bacon(true)
        .size("medium")
        .build();

    std::cout << kids    << std::endl;
    std::cout << gourmet << std::endl;
    std::cout << custom  << std::endl;

    // 3. Demonstrate validation failure
    try {
        Meal::Builder()
            .bun("gluten-free")
            .pattyCount(1)
            .bacon(true)
            .size("small")
            .build();
    } catch (const std::invalid_argument& e) {
        std::cout << "[ERROR] " << e.what() << std::endl;
    }

    return 0;
}
